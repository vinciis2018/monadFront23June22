import { IpfsCidWithMetadata } from "models";
import { instance, extractData } from "services/axios";

export class ContentUploadService {
  static submitCidWithMetadata(data: IpfsCidWithMetadata): Promise<void> {
    return instance.post("accept-cid", data);
  }

  static updateCidWithMetadata(data: IpfsCidWithMetadata): Promise<void> {
    return instance.post("edit-cid", data).then(extractData);
  }

  static getAll(owner: string): Promise<IpfsCidWithMetadata[]> {
    return instance
      .post<{ cids: IpfsCidWithMetadata[] }>("get-cids", { owner })
      .then(extractData)
      .then(({ cids }) => cids);
  }
}
