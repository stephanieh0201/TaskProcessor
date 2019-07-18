export default class Config {
  public static readonly MAX_TASKS_PROCESSING: number = Number(process.env.MAX_TASKS_PROCESSING) || 10;
}
