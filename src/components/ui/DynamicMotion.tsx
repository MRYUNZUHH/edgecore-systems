"use client";
import React, { useEffect, useState } from "react";

type AnyProps = any;

export const motion: any = new Proxy({}, {
  get(_, tag: string) {
    return function MotionProxy(props: AnyProps) {
      const [Comp, setComp] = useState<any>(null);
      useEffect(() => {
        let mounted = true;
        import("framer-motion").then((m) => {
          if (!mounted) return;
          const el = (m.motion as any)[tag] || m.motion.div;
          setComp(() => el);
        }).catch(() => {
          // ignore, leave null
        });
        return () => { mounted = false; };
      }, [tag]);

      if (!Comp) return React.createElement(tag, props);
      const C = Comp;
      return <C {...props} />;
    };
  }
});

export function AnimatePresence(props: AnyProps) {
  const [AP, setAP] = useState<any>(null);
  useEffect(() => {
    let mounted = true;
    import("framer-motion").then((m) => {
      if (!mounted) return;
      setAP(() => m.AnimatePresence);
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  if (!AP) return <React.Fragment>{props.children}</React.Fragment>;
  const C = AP;
  return <C {...props} />;
}

export default motion;
