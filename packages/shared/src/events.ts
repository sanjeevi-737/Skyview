export type EventName = "user.registered" | "user.preferences.updated" | "weather.searched"

export interface DomainEvent {
  name: EventName
  timestamp: Date
  payload: unknown
}

export interface UserRegisteredEvent extends DomainEvent {
  name: "user.registered"
  payload: { userId: string; email: string }
}

export interface UserPreferencesUpdatedEvent extends DomainEvent {
  name: "user.preferences.updated"
  payload: { userId: string; preferences: Record<string, unknown> }
}

export interface WeatherSearchedEvent extends DomainEvent {
  name: "weather.searched"
  payload: { userId?: string; lat: number; lon: number }
}

export type DomainEventMap = {
  "user.registered": UserRegisteredEvent
  "user.preferences.updated": UserPreferencesUpdatedEvent
  "weather.searched": WeatherSearchedEvent
}

export type EventHandler<E extends DomainEvent = DomainEvent> = (event: E) => void | Promise<void>
