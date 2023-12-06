export interface Task {
readonly id:string;
text:string;
done:boolean;
priority:number;
startDate:Date;
endDate:Date;
categoryId:string;
}
