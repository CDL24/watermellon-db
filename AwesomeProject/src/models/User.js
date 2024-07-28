import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators'

export default class User extends Model {
    static table = 'users';
    @field('first_name') firstName
    @field('last_name') lastName
    @field('email') email
    @field('gender') gender
    @field('mobile') mobile
    
  }
