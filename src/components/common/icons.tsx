import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faLanguage,faEraser } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

function iconFactory(icon: IconProp): React.FC {
  return () => <FontAwesomeIcon icon={icon} />;
}

export const IconCircle = iconFactory(faCircle);
export const IconLanguage = iconFactory(faLanguage);
export const IconEraser = iconFactory(faEraser)