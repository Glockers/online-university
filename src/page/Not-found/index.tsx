import { ReactElement } from "react";
import { ErrorTemplate } from "../../components/ErrorTemplate";



export const NotFound = (): ReactElement => (
    <ErrorTemplate errorCode={404} title="Страница не найдена" />
);
