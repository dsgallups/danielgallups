
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `system-ui`,
        "--theme-font-family-heading": `system-ui`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "9999px",
        "--theme-rounded-container": "8px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "0 0 0",
        "--on-secondary": "255 255 255",
        "--on-tertiary": "0 0 0",
        "--on-success": "255 255 255",
        "--on-warning": "0 0 0",
        "--on-error": "0 0 0",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #96cb1b 
        "--color-primary-50": "239 247 221", // #eff7dd
        "--color-primary-100": "234 245 209", // #eaf5d1
        "--color-primary-200": "229 242 198", // #e5f2c6
        "--color-primary-300": "213 234 164", // #d5eaa4
        "--color-primary-400": "182 219 95", // #b6db5f
        "--color-primary-500": "150 203 27", // #96cb1b
        "--color-primary-600": "135 183 24", // #87b718
        "--color-primary-700": "113 152 20", // #719814
        "--color-primary-800": "90 122 16", // #5a7a10
        "--color-primary-900": "74 99 13", // #4a630d
        // secondary | #004631 
        "--color-secondary-50": "217 227 224", // #d9e3e0
        "--color-secondary-100": "204 218 214", // #ccdad6
        "--color-secondary-200": "191 209 204", // #bfd1cc
        "--color-secondary-300": "153 181 173", // #99b5ad
        "--color-secondary-400": "77 126 111", // #4d7e6f
        "--color-secondary-500": "0 70 49", // #004631
        "--color-secondary-600": "0 63 44", // #003f2c
        "--color-secondary-700": "0 53 37", // #003525
        "--color-secondary-800": "0 42 29", // #002a1d
        "--color-secondary-900": "0 34 24", // #002218
        // tertiary | #ce6f17 
        "--color-tertiary-50": "248 233 220", // #f8e9dc
        "--color-tertiary-100": "245 226 209", // #f5e2d1
        "--color-tertiary-200": "243 219 197", // #f3dbc5
        "--color-tertiary-300": "235 197 162", // #ebc5a2
        "--color-tertiary-400": "221 154 93", // #dd9a5d
        "--color-tertiary-500": "206 111 23", // #ce6f17
        "--color-tertiary-600": "185 100 21", // #b96415
        "--color-tertiary-700": "155 83 17", // #9b5311
        "--color-tertiary-800": "124 67 14", // #7c430e
        "--color-tertiary-900": "101 54 11", // #65360b
        // success | #0e3e92 
        "--color-success-50": "219 226 239", // #dbe2ef
        "--color-success-100": "207 216 233", // #cfd8e9
        "--color-success-200": "195 207 228", // #c3cfe4
        "--color-success-300": "159 178 211", // #9fb2d3
        "--color-success-400": "86 120 179", // #5678b3
        "--color-success-500": "14 62 146", // #0e3e92
        "--color-success-600": "13 56 131", // #0d3883
        "--color-success-700": "11 47 110", // #0b2f6e
        "--color-success-800": "8 37 88", // #082558
        "--color-success-900": "7 30 72", // #071e48
        // warning | #af76cd 
        "--color-warning-50": "243 234 248", // #f3eaf8
        "--color-warning-100": "239 228 245", // #efe4f5
        "--color-warning-200": "235 221 243", // #ebddf3
        "--color-warning-300": "223 200 235", // #dfc8eb
        "--color-warning-400": "199 159 220", // #c79fdc
        "--color-warning-500": "175 118 205", // #af76cd
        "--color-warning-600": "158 106 185", // #9e6ab9
        "--color-warning-700": "131 89 154", // #83599a
        "--color-warning-800": "105 71 123", // #69477b
        "--color-warning-900": "86 58 100", // #563a64
        // error | #f70a38 
        "--color-error-50": "254 218 225", // #fedae1
        "--color-error-100": "253 206 215", // #fdced7
        "--color-error-200": "253 194 205", // #fdc2cd
        "--color-error-300": "252 157 175", // #fc9daf
        "--color-error-400": "249 84 116", // #f95474
        "--color-error-500": "247 10 56", // #f70a38
        "--color-error-600": "222 9 50", // #de0932
        "--color-error-700": "185 8 42", // #b9082a
        "--color-error-800": "148 6 34", // #940622
        "--color-error-900": "121 5 27", // #79051b
        // surface | #3e48d7 
        "--color-surface-50": "226 228 249", // #e2e4f9
        "--color-surface-100": "216 218 247", // #d8daf7
        "--color-surface-200": "207 209 245", // #cfd1f5
        "--color-surface-300": "178 182 239", // #b2b6ef
        "--color-surface-400": "120 127 227", // #787fe3
        "--color-surface-500": "62 72 215", // #3e48d7
        "--color-surface-600": "56 65 194", // #3841c2
        "--color-surface-700": "47 54 161", // #2f36a1
        "--color-surface-800": "37 43 129", // #252b81
        "--color-surface-900": "30 35 105", // #1e2369

    }
}