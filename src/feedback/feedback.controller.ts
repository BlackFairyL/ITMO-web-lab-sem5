import { FeedbackService } from './feedback.service';
import { UserService } from '../user/user.service';
import { User as UserModel, Feedback as PostModel } from '@prisma/client';
import { ApiBasicAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  ParseIntPipe,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { FeedbackDto } from './dto/feedback.dto';
import { HttpExceptionFilter } from "../http-exception.filter";
import { AuthGuard } from "../auth/auth.guard";
import { SessionContainer } from "supertokens-node/recipe/session";
import { Session } from "../auth/session.decorator";

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: FeedbackService,
  ) {}
  @ApiOperation({ summary: 'Get feedback by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Get('feedback/:id')
  async getFeedbackById(
    @Param('id', ParseIntPipe) id: string
  ): Promise<PostModel> {
    return this.postService.feedback({ id: +id });
  }

  @ApiOperation({ summary: 'Get all published feedbacks' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Get('feed')
  async getPublishedFeedbacks(): Promise<PostModel[]> {
    return this.postService.feedbacks({
      where: { published: true },
    });
  }
  @ApiOperation({ summary: 'Content feedback search' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('filtered-feedback/:searchString')
  async getFilteredFeedbacks(
    @Param('searchString') searchString: string
  ): Promise<PostModel[]> {
    return this.postService.feedbacks({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @ApiOperation({ summary: 'Post feedback' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Post('feedback')
  @ApiBasicAuth()
  async createFeedback(@Session() session: SessionContainer, @Body() feedbackDto: FeedbackDto): Promise<PostModel> {
    const { title, content, authorEmail } = feedbackDto;
    return this.postService.createFeedback({
      title,
      content,
      user: {
        connect: { email: authorEmail },
      },
    });
  }

  @ApiOperation({ summary: 'Delete feedback by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Delete('feedback/:id')
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  async deleteFeedback(@Session() session: SessionContainer, @Param('id', ParseIntPipe) id: string): Promise<PostModel> {
    return this.postService.deleteFeedback({ id: +id });
  }
}
