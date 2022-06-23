import React, { useState } from "react";

import { WithChildren } from "types/utils";
import { extractImageBase64 } from "utils/util";
import { ContentUploadService } from "services";
import { useIpfs } from "./IpfsContextContainer";
import { useWallet } from "./WalletContextContainer";
import { useInterval } from "hooks";
import { ImageMetadataWithBase64 } from "models";

const refreshInterval = 30000;

interface Context {
  $galleryData: Promise<ImageMetadataWithBase64[]> | undefined;
  loading: boolean;
  startLoadLoop(): void;
  stopLoadLoop(): void;
  getByCid(cid: string): Promise<ImageMetadataWithBase64 | undefined>;
}

export const Ctx = React.createContext<Context | undefined>(undefined);

const ContextProvider = (props: WithChildren) => {
  const [$galleryData, set$GalleryData] = useState<
    Promise<ImageMetadataWithBase64[]> | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { getArweavePublicAddress } = useWallet();
  const { getFile } = useIpfs();

  const getAll = () => {
    if (loading) {
      return $galleryData as Promise<ImageMetadataWithBase64[]>;
    }

    const decoder = new TextDecoder("utf8");
    setLoading(true);
    const galleryFetchPromise = ContentUploadService.getAll(
      getArweavePublicAddress()
    )
      .then((imageMetadataArray) =>
        Promise.all(
          (imageMetadataArray ?? []).map((imageMetadata) =>
            getFile(imageMetadata.cid).then((buffer) => ({
              ...imageMetadata,
              base64: extractImageBase64(decoder.decode(buffer)),
            }))
          )
        )
      )
      .finally(() => {
        setLoading(false);
      });
    set$GalleryData(galleryFetchPromise);
    return galleryFetchPromise;
  };

  const findByCid = (
    $gallery: Promise<ImageMetadataWithBase64[]>,
    lookedCid: string
  ): Promise<ImageMetadataWithBase64 | undefined> => {
    return $gallery.then((images) =>
      images.find(({ cid }) => lookedCid === cid)
    );
  };

  const getByCid = (
    cid: string
  ): Promise<ImageMetadataWithBase64 | undefined> => {
    return $galleryData
      ? findByCid($galleryData, cid)
      : findByCid(getAll(), cid);
  };

  const { startInterval, stopInterval } = useInterval(
    () => getAll(),
    refreshInterval
  );

  return (
    <Ctx.Provider
      value={{
        $galleryData,
        loading,
        getByCid,
        startLoadLoop: () => startInterval(true),
        stopLoadLoop: stopInterval,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useGallery must be used inside GalleryProvider`);
  }
  return context;
}

export { ContextProvider as GalleryProvider, useContext as useGallery };
