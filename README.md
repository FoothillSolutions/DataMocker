# DataMocker

## Why?
- sometimes life doesn't give you the right cup of coffee and you don't want to write tests using your backend monster servers, so you mock your entities using this mother faker!

## How?
```
import  Lister  from  "../Lister";
import  ObjectMocker  from  "../ObjectMocker";
import  Faker  from  "../extendedFaker";

interface Job {
	id: string;
	name: string;
	code: string;
	departmentId: string;
	workHoursTotal: number;
	isAvailable: boolean;
}

interface DepartmentJob {
	color: string;
	text: string;
	value: string;
}

export  class  JobMocker  extends  ObjectMocker<Job> {
	create():  Job {
		return {
			color:  "asd",
			departmentId:  this.UUIDsequencer.next(),
			id:  this.UUIDsequencer.next(),
			name:  Faker.name.firstName(),
			isAvailable: Faker.random.boolean(),
			workHoursTotal: Faker.random.range(1,50)
		};
	}
}

  

export  default  class  JobsMocker  extends  Lister<Job> {
	public  static  convertJobsToDepartmentJobs(jobs:  Job[]): DepartmentJob[] {
		return  jobs.map<DepartmentJob>(job  => ({
			color:  job.color,
			text:  job.name,
			value:  job.id,
		}));

}

	public  withDepartmentIds(...depIds:  string[]):  JobsMocker {
		const  defaultDepId  =  "0";
		this.items  =  this.items.map((job, index) => ({ ...job, departmentId: (depIds  &&  depIds[index]) ||  defaultDepId }));
		return  this;
	}

}
```