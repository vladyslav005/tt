import { Handle, Position, useNodeConnections } from "@xyflow/react";

type LimitedHandleProps = {
  id: string;
  type: "source" | "target";
  position: Position;
  maxConnections?: number;
  className?: string;
};

export function LimitedHandle({
                                id,
                                type,
                                position,
                                maxConnections = 1,
                                className,
                              }: LimitedHandleProps) {
  const connections = useNodeConnections({
    handleId: id,
    handleType: type,
  });

  return (
    <Handle
      id={id}
      className={className}
      type={type}
      position={position}
      isConnectable={connections.length < maxConnections}
    />
  );
}