import { useAssemblyAnimation } from "../../../hooks/useAssemblyAnimation";

export function useRoomAssembly(selectedSpaceId: string) {
  return useAssemblyAnimation(selectedSpaceId, 5, 450);
}
export default useRoomAssembly;
