import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

let APP_TITLE : string = "";
let TITLE_DIVIDER : string = "|";

/**
 * # A function to set the app name
 * 
 * *Only use this method in App component!*
 * 
 * \
 * <br>
 * 
 * @param {string} title - The new app title value.
 * @param {string} divider *(optional)* - The app title and page title divider value.
 * @returns {string} - The new app title value.
 * 
 * 
 * \
 * <br>
 * 
 * Set the app title by passing the app title as a string to the function.
 * 
 * @example
 * 
 * ```javascript
 *      setAppTitle("My app name");
 * ```
 * 
 * 
 * \
 * Dynamic title refreshers will rely on this value to update the page title when routing.
 * 
 * 
 * \
 * <br>
 * 
 * Your app name will be shown on every page of your app.\
 * When using the ```useRefreshTitle``` hook, the title of each page will be followed by the app name, as so:
 * 
 * \
 * <br>
 * ```html
 *      My app name | my page name
 * ```
 * 
 * \
 * <br>
 * 
 * If you want you can use a custom divider, by default ``` | ``` is used.
 * 
 * @example
 * ```javascript
 *      setAppTitle("My app name", "$");
 * ```
 * \
 * <br>
 * Which would result:
 * 
 * ```html
 *      My app name $ my page name
 * ```
 * 
 * \
 * <br>
 * 
 * 
 * ---
 * *Refresh Title V2*
 */
export function setAppTitle(title: string, divider: string = "|") : void {
    TITLE_DIVIDER = divider.trim();
    APP_TITLE = title;
}




/**
 * # A hook to update the page title
 * 
 * \
 * <br>
 * @param { string|number } mode - The mode to use for dynamically updating the title. Can be any number.
 * @param { string } divider - The custom divider for the specific page you use the hook in. The default is set to ```|``` .
 * @returns { [string, (title: string) => void] } - An array containing the current title (```title```) and a function to update the title (```setTitle```).
 * 
 * \
 * <br>
 * 
 * 
 * Use the hook as so:
 * 
 * @example
 * ```javascript
 *      const [title, setTitle] = useRefreshTitle();
 * 
 *      useEffect( () => {
 *          setTitle("my page name");
 *      }, [])
 * ```
 * 
 * You can then use the ```setTitle``` function anywhere, conditionally, to update the title of the page.
 * 
 * \
 * <br>
 * 
 * Additionally, you can utilize the **'Dynamic Title Mode'** mode by providing any number to the hook, which extracts the title from the URL parameter of your page.
 * This is done by ```react-router-dom```s ```useParams```.
 * 
 * @example
 * ```javascript
 *      const [title, setTitle] = useRefreshTitle(0); // 0 is an example, you can use any other number
 * 
 *      useEffect( () => {
 *          setTitle("my page name");
 *      }, [])
 * ```
 * 
 * \
 * <br>
 * 
 * You can also use the second parameter of the hook called ```divider``` *(optional)* to pass a custom divider for the specific page, like so:
 * 
 * @example
 * ```javascript
 *      const [title, setTitle] = useRefreshTitle(null, "::"); // "::" is an example, you can use any other string
 * 
 *      useEffect( () => {
 *          setTitle("my page name");
 *      }, [])
 * ```
 * 
 * \
 * <br>
 * Which would result:
 * 
 * ```html
 *      My app name :: my page name
 * ```
 * \
 * <br>
 * 
 * **Note**:\
 * When using both ```setTitle``` and the ```Dynamic Title Mode``` mode together, only the ```setTitle``` value will be used as the title.
 *
 * ---
 * *Refresh Title V2*
 */
export function useRefreshTitle( mode: string | number = "", divider: string = TITLE_DIVIDER ) : [string, (title: string) => void] {
    const [title, setTitle] = useState("");
    const PAGE_PARAMS = useParams();

    useEffect(() => {
        if (APP_TITLE.length) {
            if (title.length) {
                if (divider.length) {
                    document.title = `${APP_TITLE} ${divider.trim()} ${title}`;
                } else {
                    document.title = `${APP_TITLE} ${TITLE_DIVIDER} ${title}`;
                }
            } else if (typeof(mode) === "number") {
                setTitle(
                    Object.values(PAGE_PARAMS)[0] || ""
                );
            } else {
                document.title = `${APP_TITLE}`;
            }
        } else {
            document.title = `${title}`;
        }
    }, [title]);

    return [title, setTitle];
}


/**
 * # A hook to update the page title
 * 
 * @param {string} title - The new page title.
 * @param {number} mode -  The mode to use for dynamically updating the title. Can be any number.
 * @param {string} [divider=TITLE_DIVIDER] - The custom divider for the specific page you use the hook in. The default is set to ```|``` .
 * @returns {void}
 * 
 *  \
 * <br>
 * 
 * 
 * 
 * 
 */
export function useSetTitle(title: string, mode: number, divider: string = TITLE_DIVIDER) : void {
    const PAGE_PARAMS = useParams();

    useEffect( () => {
        if (APP_TITLE.length) {
            if (title.length) {
                if (divider.length) {
                    document.title = `${APP_TITLE} ${divider.trim()} ${title}`;
                } else if (typeof(mode) === "number") {
                    document.title = `${APP_TITLE} ${divider.trim()} ${Object.values(PAGE_PARAMS)[0]}`;
                } else {
                    document.title = `${APP_TITLE} ${TITLE_DIVIDER} ${title}`;
                }
            } else {
                document.title = `${APP_TITLE}`;
            }
        } else {
            if (title.length) {
                document.title = `${title}`;
            } else {
                null;
            }
        }
    }, []);
}