export default class Config {
  public static readonly MAX_TASKS_PROCESSING: number = Number(process.env.MAX_TASKS_PROCESSING) || 10;
  public static readonly MONGO_URL: string            = 'mongodb://localhost:27017';
  public static readonly MONGO_DATABASE: string       = 'taskprocessor';
}
