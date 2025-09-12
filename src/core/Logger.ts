import type { Ora } from 'ora'
import chalk from 'chalk'
import ora from 'ora'

export class Logger {
  private static spinner: Ora | null = null

  static info(message: string) {
    console.log(`${chalk.blue('ℹ')} ${chalk.blueBright(message)}`)
  }

  static infoBg(message: string) {
    console.log(`${chalk.blue('ℹ')} ${chalk.bgBlueBright(message)}`)
  }

  static warn(message: string) {
    console.log(`${chalk.yellow('⚠')} ${chalk.yellowBright(message)}`)
  }

  static warnBg(message: string) {
    console.log(`${chalk.yellow('⚠')} ${chalk.bgYellowBright(message)}`)
  }

  static error(message: string) {
    console.log(`${chalk.red('✖')} ${chalk.redBright(message)}`)
  }

  static errorBg(message: string) {
    console.log(`${chalk.red('✖')} ${chalk.bgRedBright(message)}`)
  }

  static success(message: string) {
    console.log(`${chalk.green('✔')} ${chalk.greenBright(message)}`)
  }

  static successBg(message: string) {
    console.log(`${chalk.green('✔')} ${chalk.bgGreenBright(message)}`)
  }

  static loading(message: string) {
    if (this.spinner)
      this.spinner.stop()
    this.spinner = ora({
      text: message,
      color: 'cyan',
    }).start()
  }

  static stopLoading(success = true, message?: string) {
    if (!this.spinner)
      return
    if (success) {
      this.spinner.succeed(message ?? 'Done')
    }
    else {
      this.spinner.fail(message ?? 'Failed')
    }
    this.spinner = null
  }
}
