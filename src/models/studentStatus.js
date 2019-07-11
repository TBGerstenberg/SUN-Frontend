/**
 * Class representing a studentStatus as defined by the domain model.
 */
class StudentStatus {
  constructor(studentStatusValues) {
    this.matriculationNumber = studentStatusValues.matriculationNumber;
    this.matriculationDate = studentStatusValues.matriculationDate;
    this.exmatriculationDate = studentStatusValues.exmatriculationDate;
    this.subject = studentStatusValues.subject;
  }
}

export default StudentStatus;
