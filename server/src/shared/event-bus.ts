import type { DomainEvent, EventHandler, EventName } from "@skyview/shared"
import { logger } from "@/utils/logger"

export class EventBus {
  private handlers = new Map<string, EventHandler[]>()
  private static instance: EventBus

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus()
    }
    return EventBus.instance
  }

  publish(event: DomainEvent): void {
    const handlers = this.handlers.get(event.name) || []
    for (const handler of handlers) {
      try {
        const result = handler(event)
        if (result instanceof Promise) {
          result.catch((err) => {
            logger.error(`Event handler failed for ${event.name}`, { error: err })
          })
        }
      } catch (err) {
        logger.error(`Event handler threw for ${event.name}`, { error: err })
      }
    }
  }

  subscribe(name: EventName, handler: EventHandler): () => void {
    if (!this.handlers.has(name)) {
      this.handlers.set(name, [])
    }
    this.handlers.get(name)!.push(handler)
    return () => {
      const list = this.handlers.get(name)
      if (list) {
        const idx = list.indexOf(handler)
        if (idx >= 0) list.splice(idx, 1)
      }
    }
  }
}
