/* -----------------------------------
 *
 * IMeta
 *
 * -------------------------------- */

interface IMeta {
   fileName: string;
   lineNumber?: number;
}

/* -----------------------------------
 *
 * Error
 *
 * -------------------------------- */

class TaskError extends Error {
   public metaData: IMeta;

   constructor(value: string, meta: IMeta) {
      super(value);

      this.metaData = meta;
   }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { TaskError };
