import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Hello World</h2>
      <Button variant={"destructive"}>Button</Button>
      <UserButton userProfileMode="modal" />
    </div>
  );
}
