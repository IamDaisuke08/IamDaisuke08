CREATE TABLE [dbo].[JobApplication]
(
	[Id]			BIGINT IDENTITY(1,1) NOT NULL,
	[CompanyName]	NVARCHAR(150) NOT NULL,
	[Position]		NVARCHAR(150) NOT NULL,
	[LocationId]	BIGINT NOT NULL,
	[StatusId]		BIGINT NULL,
	[Comment]		NVARCHAR(MAX),
	[CreatedDate]	DATETIME NOT NULL CONSTRAINT DF_JobApplication_CreatedDate DEFAULT(GETUTCDATE())

	CONSTRAINT [PK__JobApplication] PRIMARY KEY CLUSTERED
	(
		[Id] ASC
	),
	CONSTRAINT [FK_JobApplication_StatusId_JobStatus_Id] FOREIGN KEY([StatusId])
		REFERENCES [dbo].[JobStatus] ([Id]),
	CONSTRAINT [FK_JobApplication_LocationId_Location_Id] FOREIGN KEY([LocationId])
		REFERENCES [dbo].[Location] ([Id])
)
