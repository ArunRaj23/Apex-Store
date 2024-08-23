import { SOCIALS } from "@/constants"
import Link from "next/link"
import Wrapper from "./Wrapper"
import { Button } from "./ui/button"

const Footer = () => {
  return (
    <footer>
      <Wrapper className="flex justify-between items-center border-t py-5">
        <p className="text-lg">
          &copy; Copyright {new Date().getFullYear()}. All Rights Reserved.
        </p>

        <div className="flex gap-3">
          {SOCIALS.map((social: SocialProps) => (
            <Link key={social.name} href={social.url} target="_blank">
              <Button size={"icon"}>{social.icon}</Button>
            </Link>
          ))}
        </div>
      </Wrapper>
    </footer>
  )
}

export default Footer
