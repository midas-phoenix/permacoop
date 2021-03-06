import {UserAdministrativeDTO} from './UserAdministrativeDTO';
import {validate} from 'class-validator';
import {ContractType} from 'src/Domain/HumanResource/User/UserAdministrative.entity';

describe('UserAdministrativeDTO', () => {
  it('testValidDTO', async () => {
    const dto = new UserAdministrativeDTO();
    dto.annualEarnings = 50000;
    dto.contract = ContractType.CDI;
    dto.executivePosition = 'true';
    dto.healthInsurance = 'true';
    dto.transportFee = 75.2;
    dto.joiningDate = '2020-12-17T03:24:00';
    dto.leavingDate = '2021-12-17T03:24:00';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new UserAdministrativeDTO();
    dto.transportFee = 1.5;
    dto.joiningDate = '';
    dto.leavingDate = '';
    dto.transportFee = -10;

    const validation = await validate(dto);

    expect(validation).toHaveLength(7);
    expect(validation[0].constraints).toMatchObject({
      isInt: 'annualEarnings must be an integer number',
      isNotEmpty: 'annualEarnings should not be empty',
      isPositive: 'annualEarnings must be a positive number'
    });
    expect(validation[1].constraints).toMatchObject({
      isPositive: 'transportFee must be a positive number'
    });
    expect(validation[2].constraints).toMatchObject({
      isBooleanString: 'healthInsurance must be a boolean string',
      isNotEmpty: 'healthInsurance should not be empty'
    });
    expect(validation[3].constraints).toMatchObject({
      isBooleanString: 'executivePosition must be a boolean string',
      isNotEmpty: 'executivePosition should not be empty'
    });
    expect(validation[4].constraints).toMatchObject({
      isDateString: 'joiningDate must be a ISOString',
      isNotEmpty: 'joiningDate should not be empty'
    });
    expect(validation[5].constraints).toMatchObject({
      isDateString: 'leavingDate must be a ISOString'
    });
    expect(validation[6].constraints).toMatchObject({
      isEnum: 'contract must be a valid enum value',
      isNotEmpty: 'contract should not be empty'
    });
  });
});
