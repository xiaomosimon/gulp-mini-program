export function backFailCallbackAfterSuccess(result) {
  if (
    result.statusCode !== 200 ||
    (result.data.code && result.data.code !== 0)
  ) {
    return handleServerError(result);
  }
}

export function backFailCallback(
  response,
  message = "请求失败，请检查您的网络"
) {
  if (response.statusCode !== 200) {
    const type = typeof response.data;
    if (type === "object" && response.data.message) {
      message = response.data.message;
    } else if (type === "string") {
      message = response.data;
    }
  } else if (response.data.message) {
    message = response.data.message;
  }
  setTimeout(function () {
    wx.showModal({
      title: "出错啦",
      content: message,
      showCancel: false,
    });
  }, 300);
}

export function handleServerError(response) {
  return backFailCallback(response, "服务器出错啦");
}
