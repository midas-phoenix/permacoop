import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

export enum ContractType {
  CDI = 'cdi',
  CDD = 'cdd',
  CTT = 'ctt',
  APPRENTICESHIP = 'apprenticeship',
  PROFESSIONALIZATION = 'professionalization'
}

@Entity()
export class UserAdministrative {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'timestamp', nullable: false})
  private joiningDate: string;

  @Column({type: 'timestamp', nullable: true})
  private leavingDate: string;

  @Column({type: 'integer', nullable: false})
  private annualEarnings: number;

  @Column({type: 'integer', default: 0, nullable: true})
  private transportFee: number;

  @Column({type: 'boolean', nullable: false})
  private healthInsurance: boolean;

  @Column({type: 'boolean', nullable: false})
  private executivePosition: boolean;

  @Column('enum', {enum: ContractType, nullable: false})
  private contract: ContractType;

  constructor(
    annualEarnings: number,
    healthInsurance: boolean,
    executivePosition: boolean,
    contract: ContractType,
    joiningDate: string,
    leavingDate?: string,
    transportFee?: number
  ) {
    this.annualEarnings = annualEarnings;
    this.healthInsurance = healthInsurance;
    this.executivePosition = executivePosition;
    this.contract = contract;
    this.joiningDate = joiningDate;
    this.leavingDate = leavingDate;
    this.transportFee = transportFee;
  }

  public getId(): string {
    return this.id;
  }

  public getJoiningDate(): string {
    return this.joiningDate;
  }

  public getLeavingDate(): string {
    return this.leavingDate;
  }

  public getAnnualEarnings(): number {
    return this.annualEarnings;
  }

  public getTransportFee(): number {
    return this.transportFee;
  }

  public haveHealthInsurance(): boolean {
    return this.healthInsurance;
  }

  public isExecutivePosition(): boolean {
    return this.executivePosition;
  }

  public getContract(): ContractType {
    return this.contract;
  }
}
