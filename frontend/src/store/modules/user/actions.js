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

export function editDeliverymanRequest(data) {
  return {
    type: '@user/EDIT_DELIVERYMAN_REQUEST',
    payload: { data },
  };
}

export function editRecipientRequest(data) {
  return {
    type: '@user/EDIT_RECIPIENT_REQUEST',
    payload: { data },
  };
}

export function editOrderRequest(data) {
  return {
    type: '@user/EDIT_ORDER_REQUEST',
    payload: { data },
  };
}
