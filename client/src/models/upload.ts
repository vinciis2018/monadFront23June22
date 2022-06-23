export interface IpfsCidWithMetadata {
  cid: string;
  cidSignature: string;
  name: string;
  description: string;
  tags: string[];
  nsfw: boolean;
  owner: string;
}

export type ImageMetadataWithBase64 = IpfsCidWithMetadata & {
  base64: string;
};
