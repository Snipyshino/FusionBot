// import * as moment from 'moment';
// import {isNullOrUndefined} from 'util';
//
// export class Anomaly {
//
//     private _id: number;
//
//
//     constructor(private data: any = {}) {
//         this._id = data._id;
//         this._title = data.title;
//         this._createdAt = data.created_At;
//         this._checked = data.checked;
//     }
//
//     get checked(): boolean {
//         if (isNullOrUndefined(this._checked)) {
//             return false;
//         }
//         return this._checked;
//     }
//
//     set checked(value: boolean) {
//         this._checked = value;
//     }
//
//     get formattedDate(): string {
//         return moment(this.createdAt).fromNow();
//     }
//
//     get createdAt(): number {
//         return this._createdAt;
//     }
//
//     set createdAt(value: number) {
//         this._createdAt = value;
//     }
//
//
//     get title(): string {
//         return this._title;
//     }
//
//     set title(value: string) {
//         this._title = value;
//     }
//
//     get id(): string {
//         return this._id;
//     }
//
//     set id(value: string) {
//         this._id = value;
//     }
//
//     toJSON() {
//         return {
//             id: this.id,
//             title: this.title,
//             createdAt: this.createdAt,
//             checked: this.checked
//         };
//     }
//
// }