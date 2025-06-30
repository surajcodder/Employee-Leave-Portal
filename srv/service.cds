using db from '../db/schema';

service MyService {
  @odata.draft.enabled  @odata.draft.bypass
  entity LeaveRequest as projection on db.LeaveRequest;

  entity Files        as projection on db.Files;
  entity Comments     as projection on db.Comments;

  function addLeaveRequest(employeeName : String(100),
                           leaveType : String(50),
                           startDate : Date,
                           endDate : Date,
                           reason : String(250),
                           status : String(20) // 'Pending' or predefined
  )                                              returns LeaveRequest;


  function addFileToLeave(leaveID : UUID,
                          fileName : String,
                          mediaType : String,
                          size : Integer,
                          content : LargeString) returns UUID;


}
