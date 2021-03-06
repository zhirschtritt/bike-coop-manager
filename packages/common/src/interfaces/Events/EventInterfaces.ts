export interface BaseEventData {
  id?: string;
  type: string;
  scopeType: string;
  scopeId: string;
  happenedAt: Date;
  data: Record<string, unknown>;
}
export interface InsertedBaseEventData {
  id: string;
  sequenceId: number;
  insertedAt: Date;
}

export type BaseEvent = BaseEventData & InsertedBaseEventData;

/** Extract pre-insterted data from event interface */
export type EventDataFrom<T extends BaseEvent> = {
  [K in keyof BaseEventData]: T[K];
};

export const ShiftEventTypes = {
  SHIFT_ASSIGNED: 'shift-assigned',
  SHIFT_UNASSIGNED: 'shift-unassigned',
} as const;

export const MemberEventTypes = {
  MEMBER_CREATED: 'member-created',
} as const;

export const MembershipEventTypes = {
  MEMBERSHIP_STARTED: 'membership_started',
  MEMBERSHIP_ENDED: 'membership_ended',
  MEMBERSHIP_CANCELLED: 'membership_cancelled',
} as const;

export const CoopEventTypes = {
  ...ShiftEventTypes,
  ...MemberEventTypes,
  ...MembershipEventTypes,
} as const;
export type CoopEventType = typeof CoopEventTypes[keyof typeof CoopEventTypes];

export const CoopEventScopeTypes = {
  SHIFT: 'shift',
  MEMBER: 'member',
  MEMBERSHIP: 'membership',
} as const;
export type CoopEventScopeType = typeof CoopEventScopeTypes[keyof typeof CoopEventScopeTypes];

export type Actor = {
  type: 'user' | 'device';
  id: string;
};

export interface ShiftAssignedEvent extends BaseEvent {
  type: typeof CoopEventTypes.SHIFT_ASSIGNED;
  scopeType: typeof CoopEventScopeTypes.SHIFT;
  data: {
    shiftId: string;
    memberId: string;
    actor: Actor;
    shiftAssignmentId: string;
  };
}

export type CoopEvent = ShiftAssignedEvent;
