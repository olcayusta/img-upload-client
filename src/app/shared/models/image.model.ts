export interface Image {
  id: number;
  baseUrl: string;
  postId: string;
  mimeType: string;
  width: number;
  height: number;
  size: number;
  filename: string;
  creationTime: Date;
  parentId: string;
}
