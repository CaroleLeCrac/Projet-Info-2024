export type CreateSlotDto = {
  id: number;
  group_id: number;
  supervisor_id: number;
  session_type_id: number;
  starting_time: Date;
  date: Date;
  num_session: number;
};
