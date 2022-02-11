import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

import { BranchService } from '../pages/branch/branch.service';
import { ServiceRecordService } from '../pages/customer-care/service-record/service-secord.service';
import { RepairCustomerService } from '../pages/engineering/repair-customer/repair-customer.service';
import { RepairRecordService } from '../pages/engineering/repair-record/repair-record.service';
import { UserService } from '../pages/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private branchService: BranchService,
    private repairCustomerService: RepairCustomerService,
    private repairRecordService: RepairRecordService,
    private serviceRecordService: ServiceRecordService,
    private userService: UserService
  ) { }


  async branchDeleteDialog(branchId: string, name: string) {
    try {
      const result = await this.OpenDialog('Delete branch?');
      if (result.value) {
        this.branchService.deleteBranch(branchId);
      }
    } catch (error) { }
  }


  async deleteCustomerDialog(customerId: string) {
    try {
      const result = await this.OpenDialog('Delete customer?');
      if (result.value) {
        this.repairCustomerService.deleteCustomer(customerId);
      }
    } catch (error) { }
  }


  async deleteRepairRecordDialog(transactionId: string) {
    try {
      const result = await this.OpenDialog('Delete transaction?');
      if (result.value) {
        this.repairRecordService.deleteTransaction(transactionId);
      }
    } catch (error) { }
  }


  async deleteServiceRecordDialog(recordId: string) {
    try {
      const result = await this.OpenDialog('Delete Service record?');
      if (result.value) {
        this.serviceRecordService.deleteRecord(recordId);
      }
    } catch (error) { }
  }


  async withdrawUserInvitationDialog(invitationId: string) {
    try {
      const result = await this.OpenDialog('Withdraw invitation?');
      if (result.isConfirmed) {
        this.userService.withdrawUserInvitation(invitationId);
      }
    } catch (error) { }
  }




  private async OpenDialog(title: string) {
    return Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger w-50 bg-danger',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: true
    }).fire({
      title,
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });
  }


}
