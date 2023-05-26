import ackRequest from "@/service/index";
export function getPageListData(url: string, queryInfo: any) {
  return ackRequest.post({
    url: url,
    data: queryInfo,
  });
}
