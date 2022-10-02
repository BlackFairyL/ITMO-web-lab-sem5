import { FeedbackService } from './feedback.service';
import { UserService } from '../user/user.service';
import { User as UserModel, Feedback as PostModel } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
} from '@nestjs/common';
import { FeedbackDto } from './dto/feedback.dto';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: FeedbackService,
  ) {}
  @ApiOperation({ summary: 'Get feedback' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('feedback/:id')
  async getFeedbackById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<PostModel> {
    return this.postService.feedback({ id: +id });
  }

  @ApiOperation({ summary: 'Get feedbacks' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('feed')
  async getPublishedFeedbacks(): Promise<PostModel[]> {
    return this.postService.feedbacks({
      where: { published: true },
    });
  }
  @ApiOperation({ summary: 'Content feedback search' })
  @Get('filtered-feedback/:searchString')
  async getFilteredFeedbacks(
    @Param('searchString') searchString: string,
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

  @Post('feedback')
  async createDraft(@Body() feedbackDto: FeedbackDto): Promise<PostModel> {
    const { title, content, authorEmail } = feedbackDto;
    return this.postService.createFeedback({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  async publishFeedback(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<PostModel> {
    return this.postService.updateFeedback({
      where: { id: +id },
      data: { published: true },
    });
  }

  @Delete('feedback/:id')
  async deleteFeedback(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<PostModel> {
    return this.postService.deleteFeedback({ id: +id });
  }
}
