-- CreateTable
CREATE TABLE `activities` (
    `activityId` INTEGER NOT NULL,
    `owner` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NULL,
    `lastEdited` DATETIME(0) NULL,

    UNIQUE INDEX `activityId_UNIQUE`(`activityId`),
    INDEX `fk_assignments_users1_idx`(`owner`),
    PRIMARY KEY (`activityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activityItems` (
    `activityId` INTEGER NOT NULL,
    `docId` INTEGER NOT NULL,

    INDEX `fk_activities_has_documents_activities1_idx`(`activityId`),
    INDEX `fk_activities_has_documents_documents1_idx`(`docId`),
    PRIMARY KEY (`activityId`, `docId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignmentItems` (
    `assignmentId` INTEGER NOT NULL,
    `docVersion` INTEGER NOT NULL,
    `docId` INTEGER NOT NULL,

    INDEX `fk_assignments_has_documentVersions_assignments1_idx`(`assignmentId`),
    INDEX `fk_assignments_has_documentVersions_documentVersions1_idx`(`docVersion`, `docId`),
    PRIMARY KEY (`assignmentId`, `docVersion`, `docId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignments` (
    `assignmentId` INTEGER NOT NULL,
    `classCode` VARCHAR(45) NULL,
    `activityId` INTEGER NOT NULL,
    `owner` INTEGER NOT NULL,

    UNIQUE INDEX `assignmentId_UNIQUE`(`assignmentId`),
    INDEX `fk_assignments_activities1_idx`(`activityId`),
    INDEX `fk_assignments_users2_idx`(`owner`),
    PRIMARY KEY (`assignmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentVersions` (
    `version` INTEGER NOT NULL,
    `docId` INTEGER NOT NULL,
    `cid` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NULL,

    INDEX `fk_documents_activities1_idx`(`docId`),
    PRIMARY KEY (`version`, `docId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents` (
    `docId` INTEGER NOT NULL,
    `owner` INTEGER NOT NULL,
    `contentLocation` VARCHAR(255) NULL,
    `lastEdited` DATETIME(0) NULL,

    UNIQUE INDEX `docId_UNIQUE`(`docId`),
    INDEX `fk_activities_users_idx`(`owner`),
    PRIMARY KEY (`docId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studentAssignmentResponses` (
    `assignmentId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `score` FLOAT NULL,

    INDEX `fk_assignments_has_users_assignments1_idx`(`assignmentId`),
    INDEX `fk_assignments_has_users_users1_idx`(`userId`),
    PRIMARY KEY (`assignmentId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studentItemResponses` (
    `assignmentId` INTEGER NOT NULL,
    `docVersion` INTEGER NOT NULL,
    `docId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `response` VARCHAR(255) NULL,

    INDEX `fk_assignmentItems_has_users_assignmentItems1_idx`(`assignmentId`, `docVersion`, `docId`),
    INDEX `fk_assignmentItems_has_users_users1_idx`(`userId`),
    PRIMARY KEY (`assignmentId`, `docVersion`, `docId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `userId` INTEGER NOT NULL,
    `email` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `fk_assignments_users1` FOREIGN KEY (`owner`) REFERENCES `users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `activityItems` ADD CONSTRAINT `fk_activities_has_documents_activities1` FOREIGN KEY (`activityId`) REFERENCES `activities`(`activityId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `activityItems` ADD CONSTRAINT `fk_activities_has_documents_documents1` FOREIGN KEY (`docId`) REFERENCES `documents`(`docId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignmentItems` ADD CONSTRAINT `fk_assignments_has_documentVersions_assignments1` FOREIGN KEY (`assignmentId`) REFERENCES `assignments`(`assignmentId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignmentItems` ADD CONSTRAINT `fk_assignments_has_documentVersions_documentVersions1` FOREIGN KEY (`docVersion`, `docId`) REFERENCES `documentVersions`(`version`, `docId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `fk_assignments_activities1` FOREIGN KEY (`activityId`) REFERENCES `activities`(`activityId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `fk_assignments_users2` FOREIGN KEY (`owner`) REFERENCES `users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `documentVersions` ADD CONSTRAINT `fk_documents_activities1` FOREIGN KEY (`docId`) REFERENCES `documents`(`docId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `fk_activities_users` FOREIGN KEY (`owner`) REFERENCES `users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `studentAssignmentResponses` ADD CONSTRAINT `fk_assignments_has_users_assignments1` FOREIGN KEY (`assignmentId`) REFERENCES `assignments`(`assignmentId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `studentAssignmentResponses` ADD CONSTRAINT `fk_assignments_has_users_users1` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `studentItemResponses` ADD CONSTRAINT `fk_assignmentItems_has_users_assignmentItems1` FOREIGN KEY (`assignmentId`, `docVersion`, `docId`) REFERENCES `assignmentItems`(`assignmentId`, `docVersion`, `docId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `studentItemResponses` ADD CONSTRAINT `fk_assignmentItems_has_users_users1` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
