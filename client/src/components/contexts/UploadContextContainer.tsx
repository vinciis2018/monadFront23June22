/* eslint-disable no-console */
import React, { ReactNode, useState } from "react";
// hooks
import { useLocalStorage } from "hooks";
// utils
import { getFormattedDateFromTimestamp, getTimestamp } from "utils/util";

interface Context {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  nsfw: boolean;
  setNsfw: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  releaseDate: number | null;
  updateReleaseDate: (dateType: string, value: number) => void;
}

const Ctx = React.createContext<Context>(undefined!);

interface ProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ProviderProps) => {
  /* eslint-disable-next-line */
  const [imageUrl, setImageUrl] = useLocalStorage<string>(
    "imageUrl",
    undefined
  );
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [nsfw, setNsfw] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<number | null>(null);

  const updateReleaseDate = (dateType: string, value: number) => {
    // 2022-04-06 => 1318874398 timestamp second
    if (dateType === "time") {
      const curDate = new Date();
      const newTimestamp = getTimestamp(curDate) + value * 3600;
      console.log(getFormattedDateFromTimestamp("lll", newTimestamp));
      setReleaseDate(newTimestamp);
    } else {
      console.log(getFormattedDateFromTimestamp("lll", value));
      setReleaseDate(value);
    }
  };

  return (
    <Ctx.Provider
      value={{
        imageUrl: imageUrl ?? "",
        setImageUrl,
        tags,
        setTags,
        title,
        setTitle,
        nsfw,
        setNsfw,
        description,
        setDescription,
        releaseDate,
        updateReleaseDate,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useUpload must be used inside UploadProvider`);
  }
  return context;
}

export { ContextProvider as UploadProvider, useContext as useUpload };
