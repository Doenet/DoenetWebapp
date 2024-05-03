"use client";

import React from "react";

import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeIntroVideo from "./Tools/_framework/Paths/HomeIntroVideo";
import axios from "axios";

import {
  Box,
  Center,
  Text,
  IconButton,
  Flex,
  Link,
  Image,
  Tooltip,
  useColorModeValue,
  Button,
  VStack,
  Grid,
  GridItem,
  HStack,
  Show,
  SimpleGrid,
} from "@chakra-ui/react";

import { HiOutlineMail } from "react-icons/hi";
import { BsGithub, BsDiscord } from "react-icons/bs";

import {
  loader as caroselLoader,
  // action as homeAction,
  Home,
} from "./Tools/_framework/Paths/Home";

import {
  // loader as siteLoader,
  SiteHeader,
} from "./Tools/_framework/Paths/SiteHeader";

const router = createBrowserRouter([
  {
    path: "/",
    loader: siteLoader,
    element: (
      <>
        {/* <ChakraProvider theme={theme}> */}
          <SiteHeader />
        {/* </ChakraProvider> */}
      </>
    ),
    children: [
      {
        path: "/",
        // loader: caroselLoader,
        // action: homeAction,
        element: (
          // <DarkmodeController>
          // <MathJaxContext
          //   version={2}
          //   config={mathjaxConfig}
          //   onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
          // >
          //   <ChakraProvider theme={theme}>
              <Home />
          //   </ChakraProvider>
          // </MathJaxContext>
          // </DarkmodeController>
        ),
      },
    ]
  }]);

export async function siteLoader() {
  //Check if signedIn
  const profileInfo = undefined; //await checkIfUserClearedOut();
  let signedIn = true;
  // if (profileInfo.cookieRemoved) {
  //   signedIn = false;
  // }
  let portfolioCourseId = null;
  let firstName = "";
  let lastName = "";
  let email = "";
  let isAdmin = false;
  if (signedIn) {
    //Check on portfolio courseId
    const response = await axios.get("/api/getPorfolioCourseId.php");
    let { data } = response;
    portfolioCourseId = data.portfolioCourseId;
    firstName = data.firstName;
    lastName = data.lastName;
    email = data.email;

    if (portfolioCourseId == "") {
      portfolioCourseId = "not_created";
    }
    const isAdminResponse = await fetch(`/api/checkForCommunityAdmin.php`);
    const isAdminJson = await isAdminResponse.json();
    isAdmin = isAdminJson.isAdmin;
  }
  return { signedIn, portfolioCourseId, isAdmin, firstName, lastName, email };
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     // element: <h1>Hello there react router</h1>,
//     loader: siteLoader,
//     element:
//     <Box>
//       <Home />

//         <Flex columnGap="10px" m="10px">
//           <Link href="mailto:info@doenet.org">
//             <Tooltip label="mailto:info@doenet.org">
//               <IconButton
//                 colorScheme="blue"
//                 size="sm"
//                 fontSize="16pt"
//                 icon={<HiOutlineMail />}
//               />
//             </Tooltip>
//           </Link>

//           <Link href="https://github.com/Doenet/">
//             <Tooltip label="Doenet Github">
//               <IconButton
//                 colorScheme="blue"
//                 size="sm"
//                 fontSize="16pt"
//                 icon={<BsGithub />}
//               />
//             </Tooltip>
//           </Link>
//           <Link href="https://discord.gg/PUduwtKJ5h">
//             <Tooltip label="Doenet Discord">
//               <IconButton
//                 colorScheme="blue"
//                 size="sm"
//                 fontSize="16pt"
//                 icon={<BsDiscord />}
//               />
//             </Tooltip>
//           </Link>

//           <Link href="http://creativecommons.org/licenses/by/4.0/">
//             <Image src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
//           </Link>
//         </Flex>
//       </Box>
//         ,
//   },
// ]);

export default function BasicClientComponent() {
  return (
    <RouterProvider router={router} />
  );
}