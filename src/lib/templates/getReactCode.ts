// import { convertToPascalCase } from '@/utils';
// import { transform } from '@svgr/core';
// import jsx from '@svgr/plugin-jsx';
// // import prettier from '@svgr/plugin-prettier';
// import svgo from '@svgr/plugin-svgo';

// export const getReactCode = async (title: string, svg: string): Promise<string> => {
//     const componentName = convertToPascalCase(title);

//     return await transform(
//         svg,
//         {
//             typescript: true,
//             icon: true,
//             jsxRuntime: 'automatic',
//             plugins: [svgo, jsx],
//             svgoConfig: {
//                 plugins: [
//                     {
//                         name: 'preset-default',
//                         params: {
//                             overrides: {
//                                 removeViewBox: false
//                             }
//                         }
//                     }
//                 ]
//             }
//         },
//         { componentName: `${componentName}Icon` }
//     );
// };
