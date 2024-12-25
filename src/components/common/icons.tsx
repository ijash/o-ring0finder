import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faEraser, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function iconFactory(icon: IconProp): React.FC {
  return () => <FontAwesomeIcon icon={icon} />;
}

export const IconCircle = iconFactory(faCircle);
export const IconLanguage = iconFactory(faLanguage);
export const IconEraser = iconFactory(faEraser);
