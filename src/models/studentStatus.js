class StudentStatus {
  constructor(studentStatusValues) {
    console.log("Initializing with ");
    console.log(studentStatusValues);

    this.matriculationNumber = studentStatusValues.matriculationNumber;
    this.matriculationDate = studentStatusValues.matriculationDate;
    this.exmatriculationDate = studentStatusValues.exmatriculationDate;
    this.subject = studentStatusValues.subject;
  }
}

export default StudentStatus;
