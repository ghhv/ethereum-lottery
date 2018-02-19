import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.css']
})
export class AffiliateComponent implements OnInit {
  userProfile;
  linkRef: String;
  totalRef: Number;
  email: String;
  withdraw: Boolean;
  withdrawText: String;
  address: String;
  refList: String;

  disabledReq1: Boolean = true;
  disabledReq2: Boolean = false;

  isSent: Boolean = false;
  balance: Number;
  constructor(private data: DataService, private auth: AuthService, private modal: NgbModal) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(value => {
      this.userProfile = value.user;
      this.email = this.userProfile.email;
      this.withdraw = this.userProfile.withdraw;
      this.balance = this.userProfile.ref.length * 0.0035;
      this.address = this.userProfile.address;
      this.totalRef = this.userProfile.totalRef;
      this.refList = this.userProfile.ref.slice(-5);
      if (this.balance >= 0.035 && this.withdraw === false) {
        this.disabledReq1 = false;
      } else {
        this.withdrawText = 'Pending';
      }
    });
    this.linkRef = this.data.getLinkRef();
  }

  open(content) {
    this.modal.open(content);
  }
  onWithdrawalRequest() {
    this.data.updateAddress({email: this.email, address: this.address});
    this.data.withdrawalRequest({email: this.email, withdraw: true});
    this.isSent = true;
    this.disabledReq2 = true;
  }

}
