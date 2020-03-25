export function registerDeliverymanRequest(data) {
  return {
    type: '@user/REGISTER_DELIVERYMAN_REQUEST',
    payload: { data },
  };
}

export function registerRecipientRequest(data) {
  return {
    type: '@user/REGISTER_RECIPIENT_REQUEST',
    payload: { data },
  };
}

export function registerOrderRequest(data) {
  return {
    type: '@user/REGISTER_ORDER_REQUEST',
    payload: { data },
  };
}
