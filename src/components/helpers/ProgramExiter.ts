export default class ProgramExiter {
  public await(): void {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', () => {
      console.log('Program terminating');
      process.exit();
    });
  }
}
