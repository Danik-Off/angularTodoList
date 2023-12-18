export interface Task {
readonly id:string;
text:string;
done:boolean;
priority:number|null;
startDate:Date|null;
endDate:Date|null;
categoryId:string|null;
}
