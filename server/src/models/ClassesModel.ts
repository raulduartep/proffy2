import db from '../database/connection';
import moment from 'moment';

interface Teacher {
  whatsapp: string,
  bio: string,
  avatar: string,
  user_id?: number
}

interface Class extends Teacher {
  subject: string,
  cost: number,
}

interface CLassSchedule extends Class {
  schedule: Array<ScheduleItem>
}

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}

interface SearchClasses {
  subject: string,
  week_day: string,
  time: string,
}

interface ClassComplete extends Class {
  id: number
  name: string,
  last_name: string
}

export default {
  async create(classData: Class, classSheduleData: Array<ScheduleItem>): Promise<number> {

    const {
      whatsapp,
      bio,
      avatar,
      cost,
      subject,
      user_id
    } = classData

    const trx = await db.transaction();

    try {

      const [teacher_id] = await trx('teachers').insert({
        whatsapp,
        bio,
        avatar,
        user_id
      })

      const [class_id] = await trx('classes').insert({
        subject,
        cost,
        teacher_id
      })

      const classSchedule = classSheduleData.map(scheduleItem => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: moment.duration(scheduleItem.from).asMinutes(),
          to: moment.duration(scheduleItem.to).asMinutes(),
        }
      })

      await trx('class_schedule').insert(classSchedule)

      await trx.commit();

      return class_id;

    } catch (err) {
      console.log(err)
      await trx.rollback();
      throw new Error('Unexpected error while creating new teacher')
    }
  },

  async index({ time, week_day, subject }: SearchClasses) {
    try {
      const timeinMinutes = moment.duration(time).asMinutes();

      const classes: Array<ClassComplete> = await db('classes')
        .join('class_schedule', 'classes.id', 'class_schedule.class_id')
        .join('teachers', 'classes.teacher_id', 'teachers.id')
        .join('users', 'users.id', 'teachers.user_id')
        .where('classes.subject', '=', subject)
        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
        .whereRaw('`class_schedule`.`from` <= ??', [timeinMinutes])
        .whereRaw('`class_schedule`.`to` >= ??', [timeinMinutes])
        .select([
          'classes.*',
          'teachers.*',
          'users.name',
          'users.last_name'
        ])

      const classesWithSchedule = await Promise.all(classes.map(async classe => {
        const schedules: Array<ScheduleItem> = await db('class_schedule')
          .where('class_id', classe.id)
          .select('*')

        const schedulesConvertedHours = schedules.map(schedule => {

          const { week_day, from, to } = schedule;

          const fromConvertedForHours = moment.duration(from, 'm').asHours()
          const toConvertedForHours = moment.duration(to, 'm').asHours()

          return {
            week_day: week_day.toString(),
            from: fromConvertedForHours.toString(),
            to: toConvertedForHours.toString()
          }
        })

        return {
          ...classe,
          schedules: schedulesConvertedHours
        }
      }))

      return classesWithSchedule

    } catch (err) {
      console.log(err)
      throw new Error('Unexpected error while search classes')
    }
  },

  async indexByUserPk(user_id: number) {
    try {

      const classe: ClassComplete = await db('classes')
        .join('teachers', 'classes.teacher_id', 'teachers.id')
        .where('teachers.user_id', '=', user_id)
        .select([
          'classes.*',
          'teachers.*'
        ])
        .first()

      if (classe) {
        const classesWithSchedule: Array<ScheduleItem> = await db('class_schedule')
          .where('class_id', classe.id)
          .select('*')

        const schedulesConvertedHours = classesWithSchedule.map(schedule => {

          const { week_day, from, to } = schedule;

          const fromConverted = moment.utc(moment.duration(from, 'm').asMilliseconds()).format('HH:mm')
          const toConverted = moment.utc(moment.duration(to, 'm').asMilliseconds()).format('HH:mm')

          return {
            week_day: week_day.toString(),
            from: fromConverted,
            to: toConverted
          }
        })

        return {
          ...classe,
          schedules: schedulesConvertedHours
        }
      }

      throw new Error('No classes')
    } catch (err) {
      console.log(err)
      throw new Error('Unexpected error while search classes')
    }
  },

  async update(classData: CLassSchedule, user_id: number): Promise<number> {

    const {
      whatsapp,
      bio,
      avatar,
      cost,
      subject,
      schedule
    } = classData

    const trx = await db.transaction();

    try {

      const { id: teacher_id } = await trx('teachers')
        .where('user_id', user_id)
        .select('id')
        .first()

      await trx('teachers')
        .where('id', teacher_id)
        .update({
          whatsapp,
          bio,
          avatar,
        })

      const { id: class_id } = await trx('classes')
        .where('teacher_id', teacher_id)
        .select('id')
        .first()

      await trx('classes')
        .where('id', class_id)
        .update({
          subject,
          cost,
        })

      await trx('class_schedule')
        .where('class_id', class_id)
        .delete()

      const classSchedule = schedule.map(scheduleItem => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: moment.duration(scheduleItem.from).asMinutes(),
          to: moment.duration(scheduleItem.to).asMinutes(),
        }
      })

      await trx('class_schedule').insert(classSchedule)

      await trx.commit();

      return class_id;

    } catch (err) {
      await trx.rollback();
      throw new Error('Unexpected error while creating new teacher')
    }
  },
}