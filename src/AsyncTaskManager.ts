/**
 * AsyncTaskManager 用于管理和执行多个异步任务。
 * - 支持配置最大并发数（maxConcurrency），限制同时运行的任务数量。
 * - 支持任务失败自动重试（maxRetry），可配置重试次数。
 * - 提供 addTask 方法添加异步任务（Promise 或返回 Promise 的函数）。
 * - 提供 run 方法启动任务队列，自动调度任务执行。
 * - 支持获取所有任务结果和错误。
 */

type TaskFn<T> = () => Promise<T>

interface AsyncTaskManagerOptions {
  /**
   * 最大并发数，默认值为 5
   */
  maxConcurrency?: number
  /**
   * 每个任务最大重试次数，默认值为 2
   */
  maxRetry?: number
}

interface TaskResult<T> {
  result?: T
  error?: unknown
  attempts: number
}

export class AsyncTaskManager<T> {
  private maxConcurrency: number
  private maxRetry: number
  private runningCount = 0
  private queue: TaskFn<T>[] = []
  private results: TaskResult<T>[] = []

  constructor(options: AsyncTaskManagerOptions = {}) {
    this.maxConcurrency = options.maxConcurrency ?? 5
    this.maxRetry = options.maxRetry ?? 2
  }

  /**
   * 添加一个异步任务
   * @param taskFn 返回 Promise 的函数
   */
  addTask(...taskFn: TaskFn<T>[]) {
    this.queue.push(...taskFn)
  }

  /**
   * 启动任务队列，返回所有任务结果的 Promise
   */
  async run(): Promise<TaskResult<T>[]> {
    return new Promise((resolve) => {
      const next = () => {
        if (this.queue.length === 0 && this.runningCount === 0) {
          // 所有任务完成
          resolve(this.results)
          return
        }
        while (this.runningCount < this.maxConcurrency && this.queue.length > 0) {
          const taskFn = this.queue.shift()!
          this.runningCount++
          this.executeWithRetry(taskFn, this.maxRetry)
            .then(res => this.results.push(res))
            .finally(() => {
              this.runningCount--
              next()
            })
        }
      }
      next()
    })
  }

  /**
   * 执行任务并重试指定次数
   * @param taskFn 任务函数
   * @param retries 剩余重试次数
   */
  private async executeWithRetry(taskFn: TaskFn<T>, retries: number): Promise<TaskResult<T>> {
    let attempts = 0
    while (attempts <= retries) {
      try {
        const result = await taskFn()
        return { result, attempts: attempts + 1 }
      }
      catch (error) {
        attempts++
        if (attempts > retries) {
          return { error, attempts }
        }
      }
    }
    // 理论上不会到这里
    return { error: new Error('Unknown error'), attempts }
  }

  /**
   * 获取所有任务结果（包括成功和失败）
   */
  getResults(): TaskResult<T>[] {
    return this.results
  }
}
