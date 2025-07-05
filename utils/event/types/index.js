
/**
 * Event listener configuration
 * @typedef {Object} ListenerOptions
 * @property {boolean} [once=false] - Execute listener only once
 * @property {number} [priority=0] - Execution priority (higher = earlier)
 * @property {string} [namespace] - Listener namespace for bulk operations
 */

/**
 * Event data structure for middleware
 * @typedef {Object} EventData
 * @property {string} event - Event name
 * @property {*} data - Event payload
 * @property {boolean} cancelled - Whether event was cancelled
 * @property {number} timestamp - Event timestamp
 * @property {Object} metadata - Additional event metadata
 */

/**
 * State change data structure
 * @typedef {Object} StateChange
 * @property {string} key - State key
 * @property {*} value - New value
 * @property {*} oldValue - Previous value
 * @property {number} timestamp - Change timestamp
 */

/**
 * Middleware function signature
 * @typedef {function(EventData): Promise<void>|void} MiddlewareFunction
 */

/**
 * Event listener function signature
 * @typedef {function(*,string): void} ListenerFunction
 */

/**
 * Replay filter function signature
 * @typedef {function(EventData): boolean} ReplayFilter
 */

/**
 * Validation result
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Whether validation passed
 * @property {string} [error] - Error message if validation failed
 */
