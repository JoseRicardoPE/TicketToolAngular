export interface Employee {
    employeeId: number,
    employeeName: string,
    contactNo: string,
    emailId: string,
    deptId: number,
    password: string,
    gender: string,
    role: string
}

export interface GetEmployee {
    employeeId: number,
    employeeName: string,
    deptId: number,
    deptName: string,
    contactNo: string,
    emailId: string,
    role: string
}

