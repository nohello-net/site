declare module '@11ty/eleventy' {
    import type { EventEmitter } from "events"

    interface UserConfig {
        on(eventName: string, callback: (...args: any[]) => void): EventEmitter
        addShortcode(name: string, callback: (...args: any[]) => any): () => any
        getFilter(name: string): (...args: any[]) => any
    }
}