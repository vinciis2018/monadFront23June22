import React, { useEffect, useState } from "react";
import { IPFS, create } from "ipfs-core";

import { ipfsOptions } from "config";
import { WithChildren } from "types/utils";
import { mergeUint8Arrays } from "utils/util";

interface Context {
  addFile(file: string): ReturnType<IPFS["add"]>;
  getFile(cid: string): Promise<Uint8Array | undefined>;
}

export const Ctx = React.createContext<Context | undefined>(undefined);

const ContextProvider = (props: WithChildren) => {
  const [$node, set$node] = useState<Promise<IPFS> | undefined>(undefined);

  const initializeNode = () => create(ipfsOptions);
  const getNode = () => $node || initializeNode();

  useEffect(() => {
    set$node(initializeNode);
  }, []);

  const addFile = (base64Str: string): ReturnType<IPFS["add"]> => {
    return getNode().then((node) => node.add(base64Str));
  };

  const getFile = (cid: string) => {
    return getNode().then(async (node) => {
      const files = [];
      for await (const file of node.get(cid)) {
        files.push(file);
      }
      return mergeUint8Arrays(files);
    });
  };

  return (
    <Ctx.Provider value={{ addFile, getFile }}>{props.children}</Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useIpfs must be used inside IpfsProvider`);
  }
  return context;
}

export { ContextProvider as IpfsProvider, useContext as useIpfs };
