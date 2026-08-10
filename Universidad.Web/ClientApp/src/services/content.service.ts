export interface ContentApiItem {
  id: number;
  title: string;
  body: string;
  imageUrl?: string;
  creationDate: string;
  userId: number;
  userName: string;
  groupId: number;
  groupName: string;
  type: "News" | "Events" | "Academic" | "Default";
}

export const getContent = async (): Promise<ContentApiItem[]> => {
  const response = await fetch("/api/content");
  const data = await response.json();
  return data?.contents ?? [];
};
